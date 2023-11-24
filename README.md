# IAW-TPI
# API de Proveedores y Servicios
Administrar información sobre proveedores y operadores
turísticos, sus servicios ofrecidos. Permitir obtener las reservas realizadas para un
proveedor.

[Colección de Postman](https://martian-comet-5429.postman.co/workspace/New-Team-Workspace~d081fccf-aa71-4f85-8678-7e0f82efba7f/collection/29228719-49c8ec10-daac-4b29-a421-6de8a893c699?action=share&creator=29228719&active-environment=29228719-d5e0da2e-e106-471d-92f7-b31eb3d102be)

### Security
**bearerAuth**  

|apiKey|*API Key*|
|---|---|
|Name|Authorization|
|In|header|
|Description|Coloca tu token JWT como 'Bearer <token>'|

### /proveedores

### GET
##### Summary:

Obtener todos los proveedores

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Éxito al obtener proveedores |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### POST
##### Summary:

Crear un nuevo proveedor

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body | Datos del nuevo proveedor | Yes | object |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Proveedor creado exitosamente |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### /proveedores/{id}

### GET
##### Summary:

Obtener un proveedor por su ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | ID del proveedor a obtener | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Éxito al obtener el proveedor por su ID |
| 400 | No se encontró el proveedor con el ID especificado |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### PUT
##### Summary:

Actualizar un proveedor por su ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | ID del proveedor a actualizar | Yes | string |
| body | body | Datos actualizados del proveedor | Yes | object |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Proveedor actualizado exitosamente |
| 400 | No se encontró el proveedor con el ID especificado |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### DELETE
##### Summary:

Eliminar un proveedor por su ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | ID del proveedor a eliminar | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Proveedor eliminado exitosamente |
| 400 | No se encontró el proveedor con el ID especificado |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### /proveedores/{id}/servicios

### GET
##### Summary:

Obtener todos los servicios de un proveedor

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | ID del proveedor del que se obtienen los servicios | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Éxito al obtener los servicios del proveedor |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### POST
##### Summary:

Crear un nuevo servicio para un proveedor

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | ID del proveedor al que se agrega el servicio | Yes | string |
| body | body | Datos del nuevo servicio | Yes | object |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 | Servicio creado exitosamente |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### /proveedores/{id}/servicios/{idService}

### GET
##### Summary:

Obtener un servicio por su ID y el ID del proveedor

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | ID del proveedor | Yes | string |
| idService | path | ID del servicio | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Éxito al obtener el servicio por su ID y el ID del proveedor |
| 400 | No se encontró el servicio con el ID especificado para el proveedor dado |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### PUT
##### Summary:

Actualizar un servicio por su ID y el ID del proveedor

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | ID del proveedor | Yes | string |
| idService | path | ID del servicio a actualizar | Yes | string |
| body | body | Datos actualizados del servicio | Yes | object |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Servicio actualizado exitosamente |
| 400 | No se encontró el servicio con el ID especificado para el proveedor dado |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |

### DELETE
##### Summary:

Eliminar un servicio por su ID y el ID del proveedor

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path | ID del proveedor | Yes | string |
| idService | path | ID del servicio a eliminar | Yes | string |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 | Servicio eliminado exitosamente |
| 400 | No se encontró el servicio con el ID especificado para el proveedor dado |

##### Security

| Security Schema | Scopes |
| --- | --- |
| bearerAuth | |
