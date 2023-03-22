class APIManager{
    fetchGrantees() {
        return $.get("/grantees");
    }
}
