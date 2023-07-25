package okkt.side.graphics.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class ErrorsHandler {

    @ExceptionHandler(DateFormatException.class)
    public ResponseEntity<String> dateFormatExceptionHandler (DateFormatException e){
        log.warn("[INVALID DATE FOR REQUEST]: {}", e.toString());
        //String decodedMessage = Base64.getEncoder().encodeToString(e.toString().getBytes());
        return new ResponseEntity<>(e.toString(), HttpStatus.BAD_REQUEST);
    }
}
