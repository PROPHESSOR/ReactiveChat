import moment from 'moment';

export default class Post {
    constructor ({
        firstname = 'John',
        lastname = 'Cena',
        postdata = 'And his name is ...',
        postid,
        avatar,
        date = moment().format(),
        likes = []
    } = {}) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.postdata = postdata.replace(/@([A-Za-zА-Я-а-я]+)\s+([A-Za-zА-Я-а-я]+)/g, '<b>$1 $2</b>');
        this.postid = postid;
        this.avatar = avatar;
        this.date = moment(date * 1000).format('MMMM D h:mm:ss a');
        this.likes = likes;
    }
}
