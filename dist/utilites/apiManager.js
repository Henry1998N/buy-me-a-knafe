class APIManager {
  constructor() {
    this.data = [];
  }
  fetchGrantees() {
    return $.get("/grantees");
  }
  getFav(id) {
    return $.get(`/getAllFavorites/${id}`).then((favoriteGrantee) => {
      return favoriteGrantee[0].favorite;
    });
  }
  async getData(id) {
    this.data = await this.getFav(id);
    return this.data;
  }
}
