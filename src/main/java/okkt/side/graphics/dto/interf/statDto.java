package okkt.side.graphics.dto.interf;

import okkt.side.graphics.model.OperationalDto;
import okkt.side.graphics.model.RatingDto;

import java.util.List;

public interface statDto {

    public List<OperationalDto> getOperationalStat();

    Integer getBooksAMinute();

    Integer getBooksAmount();

    List<RatingDto> getRatingDtos(String dateFrom, String dateTo);
}
