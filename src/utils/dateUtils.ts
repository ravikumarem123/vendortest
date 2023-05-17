import dayjs, { Dayjs } from 'dayjs';

const formatDateRange = (
    startDate: Dayjs | null | undefined,
    endDate: Dayjs | null | undefined
) => {
    const start = dayjs(startDate).format('DD/MM/YYYY');
    const end = dayjs(endDate).format('DD/MM/YYYY');
    return { start, end };
};

export default formatDateRange;
