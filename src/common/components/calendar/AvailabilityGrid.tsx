// AvailabilityGrid.tsx

import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Button,
  useTheme,
  alpha,
} from '@mui/material';
import React, { useState, useEffect, useReducer } from 'react';
import {
  CaledendarActionType,
  calendarReducer,
  INITIAL_CALENDAR_STATE,
  Slots,
} from './reducer/calendar.reducer';

interface DayOfWeek {
  id: string;
  name: string;
  index: number;
}

interface TimeOption {
  id: string;
  time: string;
  index: number;
}

const daysOfWeek: DayOfWeek[] = [
  { id: '6887d0ec-d6b8-4047-99a6-8c4a48efb88a', name: 'MON', index: 1 },
  { id: '217e0c0f-0bf2-40b0-9382-7bec36123059', name: 'TUE', index: 2 },
  { id: '467d9242-1d3f-466c-87d7-f7ca4d74cf4e', name: 'WED', index: 3 },
  { id: 'd4f6735a-9a1a-46d3-8368-713419cd14a7', name: 'THU', index: 4 },
  { id: '8b9d772c-0c17-4292-a95c-fddd6b1a7029', name: 'FRI', index: 5 },
  { id: '0f79a640-28d9-46af-b013-5287925c239b', name: 'SAT', index: 6 },
  { id: 'dc441cc9-73e2-429a-91c3-7bc197938f51', name: 'SUN', index: 0 },
];

const timeOptions: TimeOption[] = [
  { id: '632598d8-3340-4f53-afec-49f640250146', time: '00:00:00', index: 1 },
  { id: '9c145d06-7161-4d78-a7e5-9dd2ae1ef80a', time: '00:30:00', index: 2 },
  { id: '74d2c9ad-e50c-45f9-ac73-a31766e271ce', time: '01:00:00', index: 3 },
  { id: 'eb0e85fd-d117-40d6-9202-4b068065fa10', time: '01:30:00', index: 4 },
  { id: 'eeb24a13-d880-4f80-bf50-affcbe7faf31', time: '02:00:00', index: 5 },
  { id: '16926334-eef3-4549-acb5-5ba2f884eb2b', time: '02:30:00', index: 6 },
  { id: 'ebec58cd-7b53-4ccf-9ee5-e147e0af3514', time: '03:00:00', index: 7 },
  { id: '49e37442-3ea0-477f-8ebe-419496b68ee1', time: '03:30:00', index: 8 },
  { id: 'f2dd9331-adbf-4c25-8862-69983d8b531d', time: '04:00:00', index: 9 },
  { id: 'ef50d751-e5fc-4d6a-8508-7edebc3fe6e4', time: '04:30:00', index: 10 },
  { id: '26e1bd69-cda0-4d00-9041-136a07a9bf66', time: '05:00:00', index: 11 },
  { id: '10e5c036-991e-4859-afca-65fd82dc5b14', time: '05:30:00', index: 12 },
  { id: '676fdbe0-69de-4c8e-a351-03f9c6dac282', time: '06:00:00', index: 13 },
  { id: '679aa7ba-a308-4106-9c7c-5c8ce743100e', time: '06:30:00', index: 14 },
  { id: '0a93757e-35aa-4c42-b7dd-e9dacd7d9323', time: '07:00:00', index: 15 },
  { id: '27d588f4-4032-4ce5-a12c-941e4bcc3401', time: '07:30:00', index: 16 },
  { id: '8dc90ae5-1954-4e73-ace6-c8d3a34a395a', time: '08:00:00', index: 17 },
  { id: '7cf3fdb8-e200-4ea6-8ca8-fd69ba6a3454', time: '08:30:00', index: 18 },
  { id: '620656d9-4d5e-4724-be74-c0bf107fcbaa', time: '09:00:00', index: 19 },
  { id: '503f7c10-32a2-4a2d-8759-dbbde6745eea', time: '09:30:00', index: 20 },
  { id: '397ba1a4-a5a3-46ef-bbcc-dea292386af9', time: '10:00:00', index: 21 },
  { id: '49850ba2-d662-4d74-902c-46242be54478', time: '10:30:00', index: 22 },
  { id: 'e84f7de3-3613-45cd-95cd-75c6080005a2', time: '11:00:00', index: 23 },
  { id: '39619f08-ad82-4d7c-aa89-24d87767c421', time: '11:30:00', index: 24 },
  { id: '45237b62-6f71-41aa-8817-dc4535825054', time: '12:00:00', index: 25 },
  { id: '0faf858e-afde-413e-8ce9-81b10bd7728d', time: '12:30:00', index: 26 },
  { id: '6f393a3c-1993-4528-94ce-e7b90b9328f3', time: '13:00:00', index: 27 },
  { id: '06883676-717d-457e-bb94-da94af4c3585', time: '13:30:00', index: 28 },
  { id: 'f0e4718f-cc7a-4a57-a00e-21ce22c8ef76', time: '14:00:00', index: 29 },
  { id: 'e2c7e33a-c924-47c0-b329-5098fe9ed03f', time: '14:30:00', index: 30 },
  { id: '5ded01e6-51da-4470-a5fc-2d7021e6dcc8', time: '15:00:00', index: 31 },
  { id: '970fec63-47a7-491a-afb8-945296d7c8d3', time: '15:30:00', index: 32 },
  { id: '4de76449-07f8-457f-a2bb-a0e855e40ffc', time: '16:00:00', index: 33 },
  { id: '76b77051-df7b-468a-b07e-6f4caaf44431', time: '16:30:00', index: 34 },
  { id: '7f24072c-3e40-4d13-9779-ec4a0280a4ff', time: '17:00:00', index: 35 },
  { id: '95021833-9d93-4243-91eb-a860d83bdd77', time: '17:30:00', index: 36 },
  { id: 'e4367c82-a5ff-4d9b-a16d-f939f6802f75', time: '18:00:00', index: 37 },
  { id: '01a586f6-134d-411f-80de-53471aad4323', time: '18:30:00', index: 38 },
  { id: '53fad445-097e-42c8-8eee-09ec84cd8cb1', time: '19:00:00', index: 39 },
  { id: '754077bd-e29d-423f-97c5-2f7d83625e95', time: '19:30:00', index: 40 },
  { id: 'deffda52-e779-4a92-8b83-84eaf9aac969', time: '20:00:00', index: 41 },
  { id: 'efe84c6e-afe0-4895-a4ea-dfde38a27938', time: '20:30:00', index: 42 },
  { id: 'f2570362-fed9-4850-86c1-55c207fbe78f', time: '21:00:00', index: 43 },
  { id: 'ae175608-48d5-4461-a736-dac04b82be82', time: '21:30:00', index: 44 },
  { id: 'a2757794-e7f5-4ce0-9717-b547f54355e1', time: '22:00:00', index: 45 },
  { id: '24536a96-db42-4f7a-9dd8-68bb33a2ba69', time: '22:30:00', index: 46 },
  { id: 'c642b29d-c0a4-4112-b944-c67ffefe583a', time: '23:00:00', index: 47 },
  { id: 'f82bdf43-d6a9-4900-a5c9-97b462d306a6', time: '23:30:00', index: 48 },
  { id: '513f1777-2a46-457c-8b15-50d6ef59e2e3', time: '23:59:00', index: 49 },
];
type BodyTableCell = {
  // onClick: () => void;
  isSelected: boolean;
  onMouseDown: () => void;
  onMouseEnter: () => void;
  onHover: () => void;
};
const BodyTableCell = ({
  // onClick,
  isSelected,
  onMouseDown,
  onMouseEnter,
  onHover,
}: BodyTableCell) => {
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (isHovered) {
      onHover();
    }
  }, [isHovered]);

  return (
    <TableCell
      onMouseDown={onMouseDown}
      onMouseEnter={() => {
        onMouseEnter();
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      // key={`${day.id}_${time.id}`}
      // onClick={onClick}
      align="center" // Maneja clic en la celda
      style={{
        cursor: 'pointer',
        border: '1px solid',
        borderColor: theme.palette.divider,
        backgroundColor: isSelected
          ? theme.palette.primary.main
          : isHovered
          ? theme.palette.secondary.main
          : theme.palette.action.disabledBackground,
      }}
    ></TableCell>
  );
};

interface Slot {
  dayOfWeek: DayOfWeek;
  timeOptionStart: TimeOption;
  timeOptionEnd: TimeOption;
  dayIndex: number;
  timeIndexStart: number;
  timeIndexEnd: number;
}

interface MergedSlot {
  day?: DayOfWeek;
  timeStart?: TimeOption;
  timeEnd?: TimeOption;
}

const CalendarGrid: React.FC = () => {
  const [{ internalSlots }, dispatch] = useReducer(
    calendarReducer,
    INITIAL_CALENDAR_STATE
  );

  const theme = useTheme();
  const [rowHovered, setRowHovered] = useState<string>('');
  useEffect(() => {
    const initialAvailability: Slots = {};
    timeOptions.slice(0, timeOptions.length - 1).forEach((time, index) => {
      daysOfWeek.forEach((day) => {
        initialAvailability[
          `${day.id}_${time.id}_${timeOptions[index + 1]?.id}`
        ] = false;
      });
    });
    dispatch({
      type: CaledendarActionType.SET_SLOTS,
      payload: initialAvailability,
    });
  }, []);
  const handleSubmit = () => {
    const selectedSlots: {
      dayId: string;
      timeIdStart: string;
      timeIdEnd: string;
    }[] = [];

    for (const key in internalSlots) {
      if (internalSlots[key]) {
        const [dayId, timeIdStart, timeIdEnd] = key.split('_');
        selectedSlots.push({ dayId, timeIdStart, timeIdEnd });
      }
    }

    const mappedSlots: Slot[] = selectedSlots.map((slot) => {
      const dayOfWeek = daysOfWeek.find((d) => d.id === slot.dayId);
      const timeOptionStart = timeOptions.find(
        (t) => t.id === slot.timeIdStart
      );
      const timeOptionEnd = timeOptions.find((t) => t.id === slot.timeIdEnd);
      return {
        dayIndex: dayOfWeek!.index,
        timeIndexStart: timeOptionStart!.index,
        timeIndexEnd: timeOptionEnd!.index,
        dayOfWeek: dayOfWeek!,
        timeOptionStart: timeOptionStart!,
        timeOptionEnd: timeOptionEnd!,
      };
    });
    //Ordenar las franjas por día y hora de inicio
    const sortedSlots = mappedSlots.sort((a, b) => {
      if (a.dayIndex !== b.dayIndex) {
        return a.dayIndex - b.dayIndex;
      }
      return a.timeIndexStart - b.timeIndexStart;
    });

    // Agrupar las franjas por día
    const groupedByDay: { [dayId: string]: typeof sortedSlots } = {};

    sortedSlots.forEach((slot) => {
      if (!groupedByDay[slot.dayIndex]) {
        groupedByDay[slot.dayIndex] = [];
      }
      groupedByDay[slot.dayIndex].push(slot);
    });

    const mergeConsecutiveSlots = (slots: Slot[]): MergedSlot[] => {
      if (slots.length === 0) return [];

      const merged: {
        day: DayOfWeek;
        timeStart: TimeOption;
        timeEnd: TimeOption;
      }[] = [];

      let current = {
        day: slots[0].dayOfWeek,
        timeStart: slots[0].timeOptionStart,
        timeEnd: slots[0].timeOptionEnd,
        startIndex: slots[0].timeIndexStart,
        endIndex: slots[0].timeIndexEnd,
      };

      for (let i = 1; i < slots.length; i++) {
        const slot = slots[i];
        if (slot.timeIndexStart === current.endIndex) {
          current.timeEnd = slot.timeOptionEnd;
          current.endIndex = slot.timeIndexEnd;
        } else {
          merged.push({
            day: current.day,
            timeStart: current.timeStart,
            timeEnd: current.timeEnd,
          });
          current = {
            day: slot.dayOfWeek,
            timeStart: slot.timeOptionStart,
            timeEnd: slot.timeOptionEnd,
            startIndex: slot.timeIndexStart,
            endIndex: slot.timeIndexEnd,
          };
        }
      }
      merged.push({
        day: current.day,
        timeStart: current.timeStart,
        timeEnd: current.timeEnd,
      });

      return merged;
    };

    const mergedSlots: MergedSlot[] = [];

    Object.values(groupedByDay).forEach((slots) => {
      const merged = mergeConsecutiveSlots(slots);
      mergedSlots.push(...merged);
    });

    console.log('mergedSlots', mergedSlots);
  };

  const handleCellClick = (
    dayId: string,
    startTimeId: string,
    finalTimeId: string
  ) => {
    dispatch({
      type: CaledendarActionType.SET_AVAILABLE_SLOTS,
      payload: {
        startTime: startTimeId,
        finalTime: finalTimeId,
        dayOfWeek: dayId,
      },
    });
  };

  const handleMouseEnter = (
    dayId: string,
    startTimeId: string,
    finalTimeId: string
  ) => {
    handleCellClick(dayId, startTimeId, finalTimeId);
  };
  const handleMouseDown = (
    dayId: string,
    startTimeId: string,
    finalTimeId: string
  ) => {
    dispatch({
      type: CaledendarActionType.ON_MOUSE_DOWN,
      payload: {
        dayOfWeekSelected: dayId,
        startTimeSelected: startTimeId,
        finalTimeSelected: finalTimeId,
      },
    });
  };
  return (
    <Paper style={{ overflowX: 'auto' }}>
      <Table
        size="small"
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onMouseUp={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch({
            type: CaledendarActionType.ON_MOUSE_UP,
            payload: {},
          });
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={2}
              sx={{
                px: '0px',
                border: '1px solid',
                borderColor: theme.palette.divider,
              }}
            ></TableCell>
            {daysOfWeek
              .sort((a, b) => a.index - b.index)
              .map((day) => (
                <TableCell
                  sx={{
                    px: '0px',
                    border: '1px solid',
                    borderColor: theme.palette.divider,
                  }}
                  key={day.id}
                  align="center"
                >
                  {day.name}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {timeOptions
            .slice(0, timeOptions.length - 1)
            .map((time, index, array) => (
              <TableRow
                key={time.id}
                sx={{
                  fontWeight: rowHovered == time.id ? 'bold' : undefined,
                  backgroundColor:
                    rowHovered == time.id
                      ? alpha(theme.palette.divider, 0.35)
                      : undefined,
                }}
              >
                <TableCell
                  sx={{
                    px: '0px',
                    border: '1px solid',
                    borderColor: theme.palette.divider,
                    textAlign: 'center',
                    fontWeight: 'inherit',
                  }}
                >
                  {array[index].time.substring(0, 5)}
                </TableCell>
                <TableCell
                  sx={{
                    padding: '0px',
                    border: '1px solid',
                    borderColor: theme.palette.divider,
                    textAlign: 'center',
                    fontWeight: 'inherit',
                  }}
                >
                  {timeOptions[index + 1]?.time?.substring(0, 5)}
                </TableCell>
                {daysOfWeek
                  .sort((a, b) => a.index - b.index)
                  .map((day) => (
                    <BodyTableCell
                      key={`${day.id}_${time.id}`}
                      isSelected={
                        internalSlots[
                          `${day.id}_${time.id}_${timeOptions[index + 1]?.id}`
                        ]
                      }
                      onHover={() => {
                        setRowHovered(time.id);
                      }}
                      onMouseDown={() => {
                        handleMouseDown(
                          day.id,
                          time.id,
                          timeOptions[index + 1]?.id
                        );
                        handleCellClick(
                          day.id,
                          time.id,
                          timeOptions[index + 1]?.id
                        );
                      }}
                      onMouseEnter={() => {
                        handleMouseEnter(
                          day.id,
                          time.id,
                          timeOptions[index + 1]?.id
                        );
                      }}
                    />
                  ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Box m={2}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Guardar Disponibilidad
        </Button>
      </Box>
    </Paper>
  );
};

export default CalendarGrid;
