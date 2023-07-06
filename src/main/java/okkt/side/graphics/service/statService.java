package okkt.side.graphics.service;

import lombok.RequiredArgsConstructor;
import okkt.side.graphics.dto.interf.statDto;
import okkt.side.graphics.model.OperationalDto;
import okkt.side.graphics.model.RatingDto;
import okkt.side.graphics.utils.DateChecker;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class statService {

    private final statDto statDto;

    private final DateChecker checker;


    public List<OperationalDto> getOperationalStat() {
        return statDto.getOperationalStat();

    }

    public Integer getBooksAMinute() {
        return statDto.getBooksAMinute();
    }

    public Integer getBooksAmount() {
        return statDto.getBooksAmount();
    }

    public List<RatingDto> getRatingDtos(String dateFrom, String dateTo) {
        checker.isDateValid(dateFrom);
        checker.isDateValid(dateTo);
        return statDto.getRatingDtos(dateFrom, dateTo);
    }
}
