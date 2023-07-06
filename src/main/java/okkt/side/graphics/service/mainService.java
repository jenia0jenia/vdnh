package okkt.side.graphics.service;

import lombok.RequiredArgsConstructor;
import okkt.side.graphics.dto.interf.MainDto;
import okkt.side.graphics.model.OperationalDto;
import okkt.side.graphics.model.RatingDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class mainService {

    private final MainDto mainDto;


    public List<OperationalDto> getOperationalStat() {
        return mainDto.getOperationalStat();

    }

    public Integer getBooksAMinute() {
        return mainDto.getBooksAMinute();
    }

    public Integer getBooksAmount() {
        return mainDto.getBooksAmount();
    }

    public List<RatingDto> getRatingDtos(String dateFrom, String dateTo) {
        return mainDto.getRatingDtos(dateFrom, dateTo);
    }
}
