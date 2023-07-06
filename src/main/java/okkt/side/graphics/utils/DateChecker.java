package okkt.side.graphics.utils;

import lombok.RequiredArgsConstructor;
import okkt.side.graphics.exception.ExceptionBuilder;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;

@Component
@RequiredArgsConstructor
public class DateChecker {

    private final ExceptionBuilder exceptionBuilder;
    private static final String DATE_FORMAT = "dd.MM.yyyy";

    public Boolean isDateValid(String date){
        SimpleDateFormat sdf = new SimpleDateFormat(DATE_FORMAT);
        sdf.setLenient(false);
        try {
            sdf.parse(date);
            return true;
        } catch (ParseException e) {
            throw exceptionBuilder.buildDateFormatException(date);
        }
    }
}
