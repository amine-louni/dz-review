const changedPasswordAfter = (JWTTimestamp: number, passwordChangedAt: Date | undefined) => {
    console.log('here')
    if (passwordChangedAt) {
        const changedTimestamp = passwordChangedAt.getTime() / 1000
        return JWTTimestamp < changedTimestamp;
    }
    return false;
}

export default changedPasswordAfter;