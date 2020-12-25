package com.techjs.linkpreview.dto;

public class LinkPreviewResponse {

    private String title;
    private String imageUrl;
    private String url;

    public LinkPreviewResponse() {
    }

    public LinkPreviewResponse(String title, String imageUrl, String url) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
