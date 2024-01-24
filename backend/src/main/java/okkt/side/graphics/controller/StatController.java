package okkt.side.graphics.controller;

import lombok.RequiredArgsConstructor;
import okkt.side.graphics.model.OperationalDto;
import okkt.side.graphics.model.RatingDto;
import okkt.side.graphics.service.StatService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin
public class StatController {

    private final StatService statService;

    // Оперативная статистика
    @GetMapping("/operational/get")
    public List<OperationalDto> getOperationalStat(){
        return statService.getOperationalStat();
    }

    @GetMapping("/books/speed")
    public Integer getBooksAMinute(){
        return statService.getBooksAMinute();
    }

    @GetMapping("/books/amount")
    public Integer getBooksAmount(){
        return statService.getBooksAmount();
    }

    @GetMapping("/rating/get")
    public List<RatingDto> getRating (@RequestParam String dateFrom,
                                      @RequestParam String dateTo){
        return statService.getRatingDtos(dateFrom, dateTo);
    }

}
