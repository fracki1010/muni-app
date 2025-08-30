export const formatLongDate = (isoDate, includeTime = true) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...(includeTime && {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        })
    });
}

//* convierte la fecha ISO en fecha larga