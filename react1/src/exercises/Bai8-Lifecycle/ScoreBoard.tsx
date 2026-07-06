import React, { Component } from "react";

// 1. Khai báo kiểu dữ liệu cho Props
interface ScoreBoardProps {
  score: number;
}

// 2. Gắn kiểu dữ liệu vào class Component thông qua dấu <>
class ScoreBoard extends Component<ScoreBoardProps> {
  // 3. Khai báo rõ kiểu của nextProps và nextState (dùng any cho state vì bài này không có state nội bộ)
  shouldComponentUpdate(nextProps: ScoreBoardProps, nextState: any) {
    // Bây giờ TypeScript đã biết nextProps và this.props chắc chắn có chứa "score"
    if (nextProps.score === this.props.score) {
      console.log("Điểm không đổi -> Chặn re-render!");
      return false;
    }
    return true;
  }

  render() {
    console.log("ScoreBoard đang render...");
    return (
      <div style={{ padding: "20px", border: "2px solid green" }}>
        <h2>Điểm số hiện tại: {this.props.score}</h2>
      </div>
    );
  }
}

// --- Phần Component Cha để test (Sửa luôn để hết lỗi đỏ nếu có) ---
interface AppState {
  score: number;
}

export default class App extends Component<{}, AppState> {
  state: AppState = { score: 10 };

  componentDidMount() {
    setInterval(() => {
      this.setState({ score: 10 });
    }, 1000);
  }

  render() {
    return <ScoreBoard score={this.state.score} />;
  }
}
