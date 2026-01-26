# CU-15 Gestionar Órdenes

```mermaid
journey
    title CU-15 Gestionar Órdenes
    section Acceso
      Accede a gestión: 4: Usuario
      Consulta lista de órdenes: 3: Usuario
    section Edición
      Selecciona orden específica: 4: Usuario
      Actualiza estado: 3: Usuario
    section Confirmación
      Sistema valida estado: 4: Sistema
      Guarda cambios exitosamente: 5: Usuario
```
