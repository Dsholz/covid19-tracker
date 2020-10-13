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

export const formatHistorialCountryData = (rawData) => {
    const extractedDates = Object.keys(rawData?.timeline?.cases)

    let formattedData = []

    extractedDates.forEach(date => {
        const casesForDate = rawData?.timeline?.cases?.[date]
        const recoverdForDate = rawData?.timeline?.recovered?.[date]
        const deathsForDate = rawData?.timeline?.deaths?.[date]
            
        formattedData.push({
            date,
            cases: casesForDate,
            deaths: deathsForDate,
            recovered: recoverdForDate,
        })
    })

    return formattedData
}