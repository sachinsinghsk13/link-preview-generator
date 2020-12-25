package com.techjs.linkpreview.controller;

import com.techjs.linkpreview.dto.LinkPreviewResponse;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/link-preview")
public class MainController {

    @GetMapping
    public ResponseEntity<LinkPreviewResponse> test(@RequestParam String url) throws IOException {
        LinkPreviewResponse linkPreviewResponse = new LinkPreviewResponse();
        String previewImageURL = null;
        Document document = Jsoup.connect(url).get();
        linkPreviewResponse.setTitle(document.title());
        Elements imageMetaElement = document.select("meta[property='og:image']");
        if (imageMetaElement != null)
            previewImageURL = imageMetaElement.first().attr("content");
        linkPreviewResponse.setImageUrl(previewImageURL);
        linkPreviewResponse.setUrl(url);
        return ResponseEntity.ok(linkPreviewResponse);
    }
}
