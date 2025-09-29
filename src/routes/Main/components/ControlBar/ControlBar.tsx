/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  ChevronLeft,
  ChevronRight,
  ThreeDotsVertical,
  X,
  Check,
} from 'react-bootstrap-icons';
import { Dropdown } from 'react-bootstrap';
import { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import classes from './ControlBar.module.scss';
import { ControlBarProps } from '../../../../types/props';
import { useWebsocket } from '../../../../context/useWebsocket';
import { useGame } from '../../../../context/useGame';
import { WebsocketMessages } from '../../../../utils/enums';
import { useUser } from '../../../../context/useUser';

const ControlBar = ({ setShowSettings, showSettings }: ControlBarProps) => {
  const [drawMenu, setDrawMenu] = useState(false);
  const { emitMessage, onMessage } = useWebsocket();
  const {
    isOnline,
    setGameResult,
    gameId,
    currentBoardIndex,
    setCurrentBoardIndex,
    boardHistory,
  } = useGame();
  const { user } = useUser();

  const sendDrawRequest = useCallback(() => {
    if (isOnline) {
      emitMessage(WebsocketMessages.DrawOffer, { gameId });
    } else {
      setGameResult({
        finished: true,
        result: 'draw',
        reason: 'both-accepted-draw',
        whoWon: '',
      });
    }
  }, [emitMessage, gameId, isOnline, setGameResult]);
  const handleToggle = useCallback(
    // @ts-expect-error
    (nextShow: boolean, meta: ToggleMetadata) => {
      setShowSettings(nextShow);
      meta.originalEvent?.stopPropagation();
    },
    [setShowSettings]
  );

  const surrender = useCallback(() => {
    if (isOnline && user?.id) {
      emitMessage(WebsocketMessages.Surrender, { gameId, playerId: user.id });
    }
  }, [emitMessage, gameId, isOnline, user?.id]);

  useEffect(() => {
    if (isOnline) {
      onMessage(WebsocketMessages.DrawOffer, (payload) => {
        console.log(payload);
        if (payload.gameId !== gameId) {
          return;
        }
        setDrawMenu(true);
      });
    }
  }, [gameId, isOnline, onMessage]);

  const sendResponse = useCallback(
    (accepted: boolean) => {
      if (accepted) {
        emitMessage(WebsocketMessages.AcceptDraw, { gameId });
      } else {
        setDrawMenu(false);
      }
    },
    [emitMessage, gameId]
  );
  const getPreviousBoard = useCallback(() => {
    setCurrentBoardIndex((prev) => Math.max(prev - 1, 0));
  }, [setCurrentBoardIndex]);

  const getNextBoard = useCallback(() => {
    setCurrentBoardIndex((prev) => Math.min(prev + 1, boardHistory.length - 1));
  }, [boardHistory.length, setCurrentBoardIndex]);
  return (
    <div className={classes.controlBarContainer}>
      {drawMenu && (
        <div className={classes.drawOfferMenu}>
          <span>Draw ?</span>
          <div className={classes.drawOfferMenuButton}>
            <Check
              width={30}
              height={30}
              className={classes.drawOfferMenuCheck}
              onClick={() => sendResponse(true)}
            />
            <X
              width={30}
              height={30}
              className={classes.drawOfferMenuCancel}
              onClick={() => sendResponse(false)}
            />
          </div>
        </div>
      )}
      <div className={classes.controlBarItem} role="button">
        <Dropdown onToggle={handleToggle}>
          <Dropdown.Toggle
            as="div"
            className={classes.controlBarDropdownToggle}
          >
            <ThreeDotsVertical
              width={30}
              height={30}
              className={classes.controlBarIcon}
            />
            <p>Settings</p>
          </Dropdown.Toggle>
          <Dropdown.Menu
            className={classes.controlBarSettingsDropdown}
            show
            style={{ opacity: showSettings ? 1 : 0 }}
          >
            <Dropdown.ItemText
              className={classes.controlBarSettingsItem}
              onClick={() => sendDrawRequest()}
            >
              Draw
            </Dropdown.ItemText>
            <Dropdown.ItemText
              className={classes.controlBarSettingsItem}
              onClick={() => surrender()}
            >
              Surrender
            </Dropdown.ItemText>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <button
        className={classNames(classes.controlBarItem, {
          [classes.disabled]: currentBoardIndex === 0,
        })}
        type="button"
        onClick={getPreviousBoard}
      >
        <ChevronLeft
          width={30}
          height={30}
          className={classes.controlBarIcon}
        />
        <p>Back</p>
      </button>

      <button
        className={classNames(classes.controlBarItem, {
          [classes.disabled]: currentBoardIndex === boardHistory.length - 1,
        })}
        type="button"
        onClick={getNextBoard}
      >
        <ChevronRight
          width={30}
          height={30}
          className={classes.controlBarIcon}
        />
        <p>Next</p>
      </button>
    </div>
  );
};

export default ControlBar;
