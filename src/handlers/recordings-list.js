export function deleteAudio(audioKey, setRecordings) {
  setRecordings((prevState) => prevState.filter((record) => record.key !== audioKey));
}
