import db from '../db';

const { reviews } = db;

class Review {
  constructor(business) {
    this.business = business;
  }

  all() {
    return reviews.filter(rev => rev.business === this.business);
  }


  add(props) {
    const r = props;
    r.id = reviews.length + 1;
    r.business = this.business;
    return reviews.push(r) && r;
  }
}

export default Review;
