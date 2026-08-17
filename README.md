# Merpes Ecommerce - Prueba Técnica - Ricardo Corredor

## Tabla de Contenidos
- [1. Resumen del Proyecto](#1-resumen-del-proyecto)
    - [Estructura de Carpetas del Proyecto](#estructura-de-carpetas-del-proyecto)
- [2. Tecnologías Utilizadas](#2-tecnologias-utilizadas)
- [3. APK Funcional y Despliegue en AWS](#3-apk-funcional-y-despliegue-en-aws)
- [4. Ejecución Local](#4-ejecucion-local)
  - [Backend (API)](#backend-api)
  - [Frontend (App)](#frontend-app)
- [5. Construcción del APK (Paso a Paso)](#5-construccion-del-apk-paso-a-paso)

---

## 1. Resumen del Proyecto <a id="1-resumen-del-proyecto"/>
Esta aplicación es un e-commerce diseñado bajo una arquitectura cliente-servidor. Cuenta con una interfaz responsiva y optimizada para dispositivos móviles. El sistema se comunica con una API REST que gestiona la lógica de negocio y la persistencia de datos de manera eficiente. La funcionalidad de la aplicación trata de seguir las indicaciones del documento de la prueba técnica.

Adicionalmente, se incluye en este repositorio un documento con el desarrollo de la prueba de análisis contenida en la prueba técnica, se encuentra en la carpeta `prueba-analisis`. Tambien se incluye el archivo con el [APK funcional](#3-apk-funcional-y-despliegue-en-aws) listo para instalar en cualquier dispositivo Android.

### Estructura de Carpetas del Proyecto <a id="estructura-de-carpetas-del-proyecto"/>

```text
MerpesEcommerce/
├── src/
│   ├── API/
│   │   └── MerpesEcommerce.API/      # Código fuente del backend (.NET 10 Web API)
│   └── client/                       # Código fuente del frontend (Angular / Ionic)
├── apk/                              # Archivo APK funcional listo para instalar en Android
├── prueba-analisis/                  # Desarrollo de prueba de análisis de la prueba técnica
├── .gitignore                        # Reglas de exclusión para Git
├── MerpesEcommerce.slnx              # Archivo de solución de Visual Studio
└── README.md                         # Documentación principal del proyecto
```

---

## 2. Tecnologías Utilizadas <a id="2-tecnologias-utilizadas"/>
- **Frontend:** Ionic/Angular (v20 con componentes Standalone, Node v24.19.0, npm v11.17.0).
- **Empaquetado Móvil:** Cordova (gestión nativa de UI y `safe-area`).
- **Backend:** .NET 10 (ASP.NET Core Web API).
- **Base de Datos:** SQLite con Entity Framework Core.
- **Infraestructura y Despliegue:** Docker, AWS EC2 (Ubuntu 26.04).

---

## 3. APK Funcional y Despliegue en AWS <a id="3-apk-funcional-y-despliegue-en-aws"/>
En este repositorio se incluye un **APK totalmente funcional** listo para ser instalado y evaluado en cualquier dispositivo Android. Al momento de instalar el APK, este se podrá encontrar bajo el nombre de "client" en el dispotivo movil en el que se instale.

Este cliente móvil consume directamente la API, la cual se encuentra desplegada en una instancia EC2 de AWS. El backend se ejecuta mediante un contenedor de **Docker**, garantizando su aislamiento. Además, la base de datos de SQLite está protegida mediante el mapeo de un volumen local en el servidor, lo que asegura que la información persista de forma permanente incluso si el contenedor es reiniciado o actualizado.

---

## 4. Ejecución Local <a id="4-ejecucion-local"/>


### Backend (API) <a id="backend-api"/>
Para levantar el servidor backend en un entorno de desarrollo local, desde visual studio ejecutando la aplicación normalmente o abrir una terminal, navegar a la raíz del proyecto de la API (donde se ubica el archivo `MerpesEcommerce.API.csproj`) y ejecuta:

```bash
dotnet restore
dotnet run
```
La API se inicializará y estará escuchando peticiones en los puertos configurados localmente (usualmente `http://localhost:5132` o `https://localhost:7214`). Una vez ejecutada la API, se aplicarán automáticamente las migraciones pendientes de la base de datos SQLite, asegurando que la base de datos se cree correctamente ysu estructura esté actualizada según el modelo de datos definido en el proyecto.

### Frontend (App) <a id="frontend-app"/>
Para ejecutar la aplicación cliente en el navegador y visualizar los cambios en tiempo real, dirígete a la carpeta raíz del frontend y ejecuta:

```bash
npm install
ionic serve
```

---

## 5. Construcción del APK (Paso a Paso) <a id="5-construccion-del-apk-paso-a-paso"/>
Si deseas generar una nueva compilación del archivo APK desde el código fuente, sigue cuidadosamente estos pasos:

**Paso 1: Configurar el entorno**
Abrir el archivo `src/environments/environment.prod.ts` y asegurarse de que la variable `apiUrl` apunte correctamente a la IP pública de la instancia EC2 en AWS o a tu entorno local:
```typescript
export const environment = {
  production: true,
  apiUrl: 'http://IP_PUBLICA_LOCAL_O_API_EN_AWS'
};
```

**Paso 2: Compilar el código de Angular**
Genera los archivos estáticos de producción optimizados ejecutando:
```bash
ionic build --prod
```

**Paso 3: Empaquetar con Cordova**
Construye el ejecutable nativo de Android utilizando el código previamente compilado:
```bash
ionic cordova build android --no-build
```

**Paso 4: Localizar el instalador**
Una vez finalizado el proceso de empaquetado, el archivo `.apk` generado se encontrará en la siguiente ruta del proyecto:
```text
platforms/android/app/build/outputs/apk/debug/app-debug.apk
```