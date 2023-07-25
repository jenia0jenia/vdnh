package okkt.side.graphics.exception;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Builder
@Getter
public class DateFormatException extends RuntimeException{

    private final String message;

    private final String date;

    @Override
    public String toString() {
        return message + " " + date;
    }
}
