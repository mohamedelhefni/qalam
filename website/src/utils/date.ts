export const beautifyDate = (date: any) => {
    if (!date) {
        return ""
    }
    var today = new Date(date);
    return today.toLocaleDateString('ar-EG-u-nu-latn', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' });
}