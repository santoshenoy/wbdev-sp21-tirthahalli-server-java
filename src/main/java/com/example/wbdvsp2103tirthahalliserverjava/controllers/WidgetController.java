package com.example.wbdvsp2103tirthahalliserverjava.controllers;

import com.example.wbdvsp2103tirthahalliserverjava.model.Widget;
import com.example.wbdvsp2103tirthahalliserverjava.services.WidgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class WidgetController {
    @Autowired
    WidgetService service;

    @PostMapping("/api/topics/{tid}/widgets")
    public Widget createWidgetForTopic(
            @PathVariable("tid") String topicId,
            @RequestBody Widget widget
    ) {
        return service.createWidgetForTopic(topicId, widget);
    }

    @DeleteMapping("/api/widgets/{wid}")
    public Integer deleteWidget(
            @PathVariable("wid") Long id) {
        return service.deleteWidget(id);
    }

    @PutMapping("/api/widgets/{wid}")
    public Integer updateWidget(
            @PathVariable("wid") Long id,
            @RequestBody Widget widget) {
        return service.updateWidget(id, widget);
    }

    @GetMapping("/api/widgets")
    public List<Widget> findAllWidgets() {
        return service.findAllWidgets();
    }

    @GetMapping("/api/topics/{tid}/widgets")
    public List<Widget> findWidgetsForTopic(
            @PathVariable("tid") String topicId
    ) {
        return service.findWidgetsForTopic(topicId);
    }
}
