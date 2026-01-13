export const getStatusColor = (status: number) => {
  switch (status) {
    // 1: activo
    case 1:
      return "bg-green-100 text-green-800";
    // 2: inactivo
    case 2:
      return "bg-gray-100 text-gray-800";
    // 3: pendiente
    case 3:
      return "bg-yellow-100 text-yellow-800";
    // 4: borrado
    case 4:
      return "bg-red-100 text-red-800";
    // 5: vendido
    case 5:
      return "bg-blue-100 text-blue-800";
    // 6: reservado
    case 6:
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
