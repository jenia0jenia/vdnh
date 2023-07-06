package okkt.side.graphics.exception;

import org.springframework.stereotype.Component;

@Component
public class ExceptionBuilder {

    public DateFormatException buildDateFormatException(String date){
        return DateFormatException.builder()
                .message("Формат даты неверен:")
                .date(date)
                .build();
    }
}
