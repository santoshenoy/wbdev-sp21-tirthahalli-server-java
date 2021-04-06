package com.example.wbdvsp2103tirthahalliserverjava.repositories;

import com.example.wbdvsp2103tirthahalliserverjava.model.Widget;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WidgetRepository  extends CrudRepository<Widget, Long> {

    @Query(value = "SELECT * FROM widgets WHERE topic_id=:tid", nativeQuery = true)
    public List<Widget> findWidgetsForTopic(@Param("tid") String topicId);

    @Query(value = "SELECT * FROM widgets WHERE id=:wid", nativeQuery = true)
    public Widget findWidgetsById(@Param("wid") Long widgetId);

}
