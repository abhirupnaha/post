import "./App.css";

import PostContextProvider from "./store/PostContextProvider";
import NewPost from "./components/Post/NewPost/NewPost";
// import Card from "./components/ui/Card/Card";
import ShowContent from "./components/Content/ShowContent/ShowContent";
// import Modal from "./components/ui/Modal/Modal";

function App() {
  return (
    <main>
      <PostContextProvider>
        <NewPost />
        <ShowContent />
      </PostContextProvider>
    </main>
  );
}

export default App;
