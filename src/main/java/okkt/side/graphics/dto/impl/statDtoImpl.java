package okkt.side.graphics.dto.impl;

import lombok.RequiredArgsConstructor;
import okkt.side.graphics.dto.interf.statDto;
import okkt.side.graphics.model.OperationalDto;
import okkt.side.graphics.model.RatingDto;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class statDtoImpl implements statDto {

    private final JdbcTemplate template;

    @Override
    public List<OperationalDto> getOperationalStat(){
        String sql = "exec dbo.pBDHXToday @V=0";
        return  template.query(sql, (rs, rowNum) ->
             OperationalDto.builder()
                    .kv(rs.getInt("KV"))
                    .pos(rs.getInt("POS"))
                    .libName(rs.getString("LibName"))
                    .nekz(rs.getInt("NEKZ"))
                    .newR(rs.getInt("NewR"))
                    .regR(rs.getInt("RegR"))
                     .kmv(rs.getInt("KMV"))
                     .kfil(rs.getInt("KFIL"))
                    .build()
        );

    }

    @Override
    public Integer getBooksAMinute() {
        String sql = "exec dbo.pBDHXToday @V=1";
        return template.queryForObject(sql, Integer.class);
    }

    @Override
    public Integer getBooksAmount() {
        String sql = "exec dbo.pBDHXToday @V=2";
        return template.queryForObject(sql, Integer.class);
    }

    @Override
    public List<RatingDto> getRatingDtos(String dateFrom, String dateTo) {
        String sql = "EXEC pKVRatingCOVER @D1Ф=?, @D2Ф=?";
        return template.query(sql, (rs, rowNum) -> RatingDto.builder()
                        .book(rs.getString("BOOK"))
                        .k(rs.getInt("K"))
                        .cover(rs.getString("COVER"))
                        .build(),
                         dateFrom, dateTo);
    }

}
