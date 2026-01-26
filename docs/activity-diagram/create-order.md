# CU-13 Generar Orden de Compra (Proceso Automático)

```mermaid
journey
    title CU-13 Generar Orden de Compra (Proceso Automático)
    section Trigger
      Checkout confirmado: 5: Comprador
    section Procesamiento Interno
      Generar orden: 3: Sistema
      Registrar en base de datos: 3: Sistema
      Actualizar inventario: 3: Sistema
    section Notificación
      Notificar creación orden: 5: Sistema, Comprador
```
