import dayjs from 'dayjs';

export const timeForToday = (value: string) => {
    const today = dayjs();
    const timeValue = dayjs(value);
    const betweenTime = today.diff(timeValue, 'minute');
    //if (betweenTime < 60) return timeValue.format('A h:mm');
    // if (betweenTime < 60) return `${betweenTime}분 전`;

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return timeValue.format('A h:mm');
    } else if (betweenTimeHour < 48) {
        return '어제';
    }

    return `${timeValue.month() + 1}월 ${timeValue.date()}일`;
};
