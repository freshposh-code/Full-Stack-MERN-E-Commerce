const displayNAIRACurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-IN', {
        style: "currency",
        currency: 'USD',
        minimumFractionDigits: 2
    })

    return formatter.format(num)

}

export default displayNAIRACurrency