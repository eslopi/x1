export const formatOperatingHours = (hours: string): string => {
  const date = new Date(`1970-01-01T${hours}`);
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
};

export const isCurrentlyOpen = (openTime: string, closeTime: string): boolean => {
  const now = new Date();
  const [openHour, openMinute] = openTime.split(':');
  const [closeHour, closeMinute] = closeTime.split(':');
  
  const open = new Date(now.setHours(parseInt(openHour), parseInt(openMinute)));
  const close = new Date(now.setHours(parseInt(closeHour), parseInt(closeMinute)));
  
  return now >= open && now <= close;
};