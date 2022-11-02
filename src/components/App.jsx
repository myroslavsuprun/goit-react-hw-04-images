import React, { useState, useEffect } from 'react';

import PixabayAPI from 'js/Components/PixabayAPI';

// Components
import AppWrapper from './AppWrapper';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';
import Message from './Message';
import Loader from './Loader';
import Button from './Button';
import Modal from 'components/Modal';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const STATUS_TYPE = {
  idle: 'idle',
  rejected: 'rejected',
  pending: 'pending',
  resolved: 'resolved',
};

const LOAD_MORE_STATUS_TYPE = {
  hidden: 'hidden',
  shown: 'shown',
  pending: 'pending',
};

const INITIAL_STATE = {
  status: STATUS_TYPE.idle,
  loadMoreStatus: LOAD_MORE_STATUS_TYPE.hidden,
  searchQuery: null,
  data: null,
  rejectMessage: '',
  modalImg: false,
  didMount: false,
};

const App = () => {
  const [status, setStatus] = useState(INITIAL_STATE.status);
  const [loadMoreStatus, setLoadMoreStatus] = useState(
    INITIAL_STATE.loadMoreStatus
  );
  const [searchQuery, setSearchQuery] = useState(INITIAL_STATE.searchQuery);
  const [data, setData] = useState(INITIAL_STATE.data);
  const [rejectMessage, setRejectMessage] = useState(
    INITIAL_STATE.rejectMessage
  );
  const [modalImg, setModalImg] = useState(INITIAL_STATE.modalImg);

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, [loadMoreStatus]);

  useEffect(() => {
    if (searchQuery === null) return;

    setStatus(STATUS_TYPE.pending);
    setModalImg(INITIAL_STATE.modalImg);

    try {
      (async () => {
        const fetchedData = await PixabayAPI.getImages(searchQuery);
        setData([...fetchedData]);
      })();
    } catch (e) {
      setRejectMessage(e.message);
      setStatus(STATUS_TYPE.rejected);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (data === null) return;

    setStatus(STATUS_TYPE.resolved);
    setLoadMoreStatus(ifMoreImagesPossible());

    if (data.length <= 0) {
      toast.warning('Woops, nothing was found.');
    } else {
      toast('Here are your results');
    }
  }, [data]);

  function onFormSubmit(newSearchQuery) {
    setSearchQuery(newSearchQuery);
  }

  function onImgCardClick(modalImg) {
    setModalImg(modalImg);
  }

  async function onLoadMoreClick() {
    setLoadMoreStatus(STATUS_TYPE.pending);

    try {
      const incomingData = await PixabayAPI.getImages();

      setData([...data, ...incomingData]);
      setLoadMoreStatus(ifMoreImagesPossible());
    } catch (e) {
      setRejectMessage(e.message);
      setStatus(STATUS_TYPE.rejected);
    }
  }

  function onModalClose() {
    setModalImg(INITIAL_STATE.modalImg);
  }

  function ifMoreImagesPossible() {
    return PixabayAPI.ifMoreImagesPossible
      ? LOAD_MORE_STATUS_TYPE.shown
      : LOAD_MORE_STATUS_TYPE.hidden;
  }

  const renderIfStatusIdle = () =>
    status === STATUS_TYPE.idle && (
      <Message title="Start looking for images 🔎" />
    );

  const renderIfStatusPending = () =>
    status === STATUS_TYPE.pending && (
      <Loader positionType={'absolute'} ifLargeSize={true} />
    );

  const renderIfStatusResolved = () =>
    status === STATUS_TYPE.resolved && (
      <ImageGallery data={data ? data : []} onImgCardClick={onImgCardClick} />
    );

  const renderIfStatusRejected = () =>
    status === STATUS_TYPE.rejected && <Message title={rejectMessage} />;

  const renderLoadMore = () => {
    if (loadMoreStatus === LOAD_MORE_STATUS_TYPE.hidden) return;

    if (loadMoreStatus === LOAD_MORE_STATUS_TYPE.pending)
      return <Loader positionType="centered" ifLargeSize={false} />;

    if (loadMoreStatus === LOAD_MORE_STATUS_TYPE.shown)
      return <Button onClick={onLoadMoreClick} title="Load More" />;
  };

  return (
    <AppWrapper>
      <SearchBar onFormSubmit={onFormSubmit} />

      {renderIfStatusIdle()}
      {renderIfStatusPending()}
      {renderIfStatusResolved()}
      {renderIfStatusRejected()}
      {renderLoadMore()}

      {modalImg && <Modal onModalClose={onModalClose} modalImg={modalImg} />}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </AppWrapper>
  );
};

export default App;
