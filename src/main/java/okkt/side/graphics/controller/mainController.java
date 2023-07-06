package okkt.side.graphics.controller;

import lombok.RequiredArgsConstructor;
import okkt.side.graphics.model.OperationalDto;
import okkt.side.graphics.model.RatingDto;
import okkt.side.graphics.service.mainService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/stat")
public class mainController {

    private final mainService mainService;

    // Оперативная статистика
    @GetMapping("/operational/get")
    public List<OperationalDto> getOperationalStat(){
        return mainService.getOperationalStat();
    }

    @GetMapping("/books/speed")
    public Integer getBooksAMinute(){
        return mainService.getBooksAMinute();
    }

    @GetMapping("/books/amount")
    public Integer getBooksAmount(){
        return mainService.getBooksAmount();
    }

    @GetMapping("/rating/get")
    public List<RatingDto> getRating (@RequestParam String dateFrom,
                                      @RequestParam String dateTo){
        return mainService.getRatingDtos(dateFrom, dateTo);
    }

}
