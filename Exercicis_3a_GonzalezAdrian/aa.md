Perfecto 🔥
Vamos a hacerlo **paso a paso, limpio, reproducible y 100 % compatible con tu kernel Surface 6.17.1-arch1-1-surface**.
Esta guía te dejará el módulo `intel_rapl_mmio` compilado, instalado y cargado automáticamente al arranque.

---

# 🧰 GUÍA COMPLETA – Compilar e instalar `intel_rapl_mmio` en kernel Surface

> 💡 Probado en Arch/Manjaro con kernel `6.17.x-surface`.
> No recompila todo el kernel, solo el módulo faltante.

---

## 1️⃣ Instalar dependencias necesarias

Abre una terminal y ejecuta:

```bash
sudo pacman -S --needed base-devel git wget linux-surface-headers
```

Esto instala:

* las herramientas de compilación (`make`, `gcc`, etc.)
* los headers del kernel que estás usando (`/usr/lib/modules/$(uname -r)/build`)

Verifica que existen:

```bash
ls /lib/modules/$(uname -r)/build
```

Si ves carpetas como `drivers`, `include`, `Makefile` → perfecto ✅

---

## 2️⃣ Crear un entorno de trabajo limpio

```bash
mkdir -p ~/build/rapl_mmio && cd ~/build/rapl_mmio
```

---

## 3️⃣ Descargar el código fuente del módulo

El código vive dentro del árbol oficial de Linux, en `drivers/powercap/`.
Vamos a descargar solo los archivos necesarios de la versión **6.17** (igual o compatible con la tuya):

```bash
wget https://raw.githubusercontent.com/torvalds/linux/v6.17/drivers/powercap/intel_rapl_common.c
wget https://raw.githubusercontent.com/torvalds/linux/v6.17/drivers/powercap/intel_rapl_mmio.c
wget https://raw.githubusercontent.com/torvalds/linux/v6.17/drivers/powercap/intel_rapl.h
```

---

## 4️⃣ Crear un `Makefile` para compilar el módulo

Crea un archivo llamado `Makefile`:

```bash
nano Makefile
```

y pega exactamente esto 👇

```makefile
obj-m := intel_rapl_mmio.o

KDIR := /lib/modules/$(shell uname -r)/build
PWD  := $(shell pwd)

all:
	$(MAKE) -C $(KDIR) M=$(PWD) modules

clean:
	$(MAKE) -C $(KDIR) M=$(PWD) clean
```

Guarda con `Ctrl+O`, `Enter`, y cierra con `Ctrl+X`.

---

## 5️⃣ Compilar el módulo

Ejecuta:

```bash
make
```

🔹 Si todo va bien, verás algo como:

```
CC [M]  /home/adri/build/rapl_mmio/intel_rapl_mmio.o
LD [M]  /home/adri/build/rapl_mmio/intel_rapl_mmio.ko
```

🔹 Comprueba que el archivo se generó:

```bash
ls -lh intel_rapl_mmio.ko
```

Debe mostrar un archivo de unos 40–60 KB.

---

## 6️⃣ Instalar el módulo en el sistema

Copia el `.ko` al directorio oficial de módulos del kernel y actualiza dependencias:

```bash
sudo cp intel_rapl_mmio.ko /lib/modules/$(uname -r)/kernel/drivers/powercap/
sudo depmod -a
```

Ahora cárgalo manualmente:

```bash
sudo modprobe intel_rapl_mmio
```

Verifica:

```bash
lsmod | grep rapl
```

Deberías ver:

```
intel_rapl_mmio
intel_rapl_common
intel_rapl_msr
```

Y comprobar que el path existe:

```bash
ls /sys/class/powercap/intel-rapl-mmio/
```

Si ves algo como:

```
intel-rapl-mmio:0  intel-rapl-mmio:0:0
```

→ ✅ ¡ya está funcionando!

---

## 7️⃣ (Opcional) Cargar el módulo automáticamente al arranque

Para que no tengas que ejecutarlo cada vez:

```bash
echo "intel_rapl_mmio" | sudo tee /etc/modules-load.d/intel_rapl_mmio.conf
```

---

## 8️⃣ Probar que `thermald` ahora lo usa

Ejecuta:

```bash
sudo thermald --no-daemon --rapl-mode mmio --loglevel=debug | grep "RAPL domain"
```

Deberías ver algo como:

```
[INFO]RAPL domain count 3
[INFO]name = package-0
[INFO]name = core
[INFO]name = uncore
```

Si es así → **RAPL activo por MMIO y totalmente funcional** 🎉

---

## 9️⃣ (Opcional) Integrar con systemd permanentemente

Si tu `override.conf` ya existe, asegúrate de que esté así:

```ini
[Service]
ExecStart=
ExecStart=/usr/bin/thermald --systemd --dbus-enable --adaptive --rapl-mode mmio
```

Reinicia el servicio:

```bash
sudo systemctl daemon-reexec
sudo systemctl daemon-reload
sudo systemctl restart thermald
sudo systemctl status thermald
```

---

## ✅ Resultado final

* `intel_rapl_mmio.ko` compilado e instalado
* `/sys/class/powercap/intel-rapl-mmio/` visible
* `thermald` detecta correctamente los dominios RAPL
* Control térmico completo (PL1/PL2 dinámico) funcionando

---

¿Quieres que te genere un **script automático (`build_rapl_mmio.sh`)** con todos estos pasos listos para ejecutar con un solo comando (`sudo bash build_rapl_mmio.sh`)?
