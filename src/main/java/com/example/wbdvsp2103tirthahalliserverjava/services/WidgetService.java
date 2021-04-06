package com.example.wbdvsp2103tirthahalliserverjava.services;

import com.example.wbdvsp2103tirthahalliserverjava.model.Widget;
import com.example.wbdvsp2103tirthahalliserverjava.repositories.WidgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WidgetService {
    @Autowired
    WidgetRepository repository;

    private List<Widget> widgets = new ArrayList<Widget>();

    {
        /*Widget w1 = new Widget(123l, "ABC123", "HEADING", 1, "Widgets for Topic ABC123");
        Widget w2 = new Widget(234l, "ABC123", "PARAGRAPH", 1, "Lorem Ipsum");
        Widget w3 = new Widget(345l, "ABC234", "HEADING", 2, "Widgets for Topic ABC234");
        Widget w4 = new Widget(456l, "ABC234", "PARAGRAPH", 1, "Lorem Ipsum");
        Widget w5 = new Widget(567l, "ABC234", "PARAGRAPH", 1, "Lorem Ipsum");

        widgets.add(w1);
        widgets.add(w2);
        widgets.add(w3);
        widgets.add(w4);
        widgets.add(w5);*/
    }

    public Widget createWidgetForTopic(String topicId, Widget widget) {
        widget.setTopicId(topicId);
        return repository.save(widget);
    }

    public Integer deleteWidget(Long id) {
        repository.deleteById(id);
        return 1;
    }

    public Integer updateWidget(Long id, Widget widget) {
        Widget widget1 = repository.findWidgetsById(id);
        widget1.setText(widget.getText());
        widget1.setType(widget.getType());
        widget1.setSize(widget.getSize());
        widget1.setWidth(widget.getWidth());
        widget1.setHeight(widget.getHeight());
        widget1.setUrl(widget.getUrl());
        widget1.setWidgetOrder(widget.getWidgetOrder());
        widget1.setValue(widget.getValue());
        repository.save(widget1);
        return 1;
    }

    public List<Widget> findAllWidgets() {
        return (List<Widget>) repository.findAll();
    }

    public List<Widget> findWidgetsForTopic(String topicId) {
        return repository.findWidgetsForTopic(topicId);
    }
}