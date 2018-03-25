import db from '../db';

const { reviews } = db;

class Review {
  constructor(businessId) {
    this.businessId = businessId;
  }

  all() {
    return reviews.filter(rev => rev.business === this.businessId);
  }


  add(props) {
    props.id = reviews.length + 1;
    props.business = this.businessId;
    if (reviews.push(props)) {
      return props;
    }
  }
}

export default Review;
