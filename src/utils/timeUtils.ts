import { WEEKLY_SCHEDULE } from '../data/cafeData';

export interface OpeningStatus {
  isOpen: boolean;
  statusText: string;
  badgeClass: string;
  nextDetail: string;
}

export function getCurrentOpeningStatus(): OpeningStatus {
  const now = new Date();
  const dayIndex = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  
  // Map JS day index to schedule array index (Mon = 0, Sun = 6)
  const scheduleMapIndex = dayIndex === 0 ? 6 : dayIndex - 1;
  const todaySchedule = WEEKLY_SCHEDULE[scheduleMapIndex];

  const currentHours = now.getHours() + now.getMinutes() / 60;

  const isOpen = currentHours >= todaySchedule.openTime && currentHours < todaySchedule.closeTime;

  if (isOpen) {
    const closeHoursInt = Math.floor(todaySchedule.closeTime);
    const closeMinutesInt = Math.round((todaySchedule.closeTime - closeHoursInt) * 60);
    const formattedClose = `${closeHoursInt}:${closeMinutesInt === 0 ? '00' : closeMinutesInt}`;

    return {
      isOpen: true,
      statusText: `Abierto ahora`,
      badgeClass: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
      nextDetail: `Cierra a las ${formattedClose}`,
    };
  } else {
    // Determine next opening time
    let nextDaySchedule = todaySchedule;
    let isTomorrow = false;

    if (currentHours < todaySchedule.openTime) {
      // Opens later today
      nextDaySchedule = todaySchedule;
    } else {
      // Opens tomorrow
      const nextIndex = (scheduleMapIndex + 1) % 7;
      nextDaySchedule = WEEKLY_SCHEDULE[nextIndex];
      isTomorrow = true;
    }

    const openHoursInt = Math.floor(nextDaySchedule.openTime);
    const openMinutesInt = Math.round((nextDaySchedule.openTime - openHoursInt) * 60);
    const formattedOpen = `${openHoursInt}:${openMinutesInt === 0 ? '00' : '30'}`;

    return {
      isOpen: false,
      statusText: `Cerrado ahora`,
      badgeClass: 'bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30',
      nextDetail: isTomorrow 
        ? `Abre mañana a las ${formattedOpen}` 
        : `Abre hoy a las ${formattedOpen}`,
    };
  }
}
