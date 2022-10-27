import parse from 'date-fns/parse'

export const getLatestImageUrl = (apartment) => {
    const array = [...apartment.images];
    console.log(array);
    const sortedDates = array.sort(function (a, b) {
        const dateA = parse(a, 'yyyyMMdd_HHmmss', new Date())
        const dateB = parse(b, 'yyyyMMdd_HHmmss', new Date())
        return dateB - dateA;
    });
    console.log(sortedDates);
    const latestImageUrl = sortedDates[0];
    return latestImageUrl.url;
}
