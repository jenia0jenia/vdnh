package okkt.side.graphics.service;

import lombok.RequiredArgsConstructor;
import okkt.side.graphics.dto.interf.StatDao;
import okkt.side.graphics.model.OperationalDto;
import okkt.side.graphics.model.RatingDto;
import okkt.side.graphics.utils.DateChecker;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StatService {

    private final StatDao statDao;

    private final DateChecker checker;


    public List<OperationalDto> getOperationalStat() {
        return statDao.getOperationalStat();

    }

    public Integer getBooksAMinute() {
        return statDao.getBooksAMinute();
    }

    public Integer getBooksAmount() {
        return statDao.getBooksAmount();
    }

    public List<RatingDto> getRatingDtos(String dateFrom, String dateTo) {
        checker.isDateValid(dateFrom);
        checker.isDateValid(dateTo);
        return statDao.getRatingDtos(dateFrom, dateTo);
    }
}
