export const convertTime = (createdAt) => {
    try {
        let createdTime = new Date(createdAt);
        let currentTime = new Date();
        let diff = currentTime - createdTime;
        let seconds = Math.floor(diff / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);
        let weeks = Math.floor(days / 7);

        if (weeks > 0) {
            return weeks + ' weeks ago';
        } else if (days > 0) {
            return days + ' days ago';
        } else if (hours > 0) {
            return hours + ' hours ago';
        } else if (minutes > 0) {
            return minutes + ' minutes ago';
        }
        return seconds + ' seconds ago';
    } catch (error) {
        console.log(error);
    }
}

export const convertDate = (date) => {
    try {
        let newDate = new Date(date);
        let day = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        return `${day}/${month}/${year}`;
    } catch (error) {
        console.log(error);
    }
}

