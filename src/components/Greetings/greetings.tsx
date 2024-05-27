import moment from 'moment';

export const greeting = () => {
  let grt;
  const hr = moment().hour();
  if (hr < 12) {
    grt = 'Good morning';
  } else if (hr < 18) {
    grt = 'Good afternoon';
  } else {
    grt = 'Good evening';
  }

  return grt;
};
