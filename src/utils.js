export const formatHistorialData = (rawData) => {
    const extractedDates = Object.keys(rawData?.cases)

    let formattedData = []

    extractedDates.forEach(date => {
        const casesForDate = rawData?.cases?.[date]
        const recoverdForDate = rawData?.recovered?.[date]
        const deathsForDate = rawData?.deaths?.[date]
            
        formattedData.push({
            date,
            cases: casesForDate,
            deaths: deathsForDate,
            recovered: recoverdForDate,
        })
    })

    return formattedData
}