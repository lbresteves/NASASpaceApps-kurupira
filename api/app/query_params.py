from typing import Annotated

from fastapi import Query

from app.hotspot_data import FIRST_YEAR, LAST_YEAR

YearList = Annotated[list[Annotated[int, Query(ge=FIRST_YEAR, le=LAST_YEAR)]], Query()]
MonthList = Annotated[list[Annotated[int, Query(ge=1, le=12)]], Query()]
StateCode = Annotated[str | None, Query(pattern=r"^\d{2}$", description="IBGE state code, e.g. 51 for Mato Grosso")]
