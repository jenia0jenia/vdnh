package okkt.side.graphics.model;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@Getter
@Setter
@RequiredArgsConstructor
@Builder
public class OperationalDto {

    String libName;

    int newR;

    int regR;

    int kv;

    int pos;

    int nekz;
}
