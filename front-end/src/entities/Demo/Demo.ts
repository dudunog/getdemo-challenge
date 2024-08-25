import { Frame } from "../Frame";

export type DemoProps = {
  id: string;
  name: string;
  frames: Frame[];
};

/**
 * @name Demo
 * @description
 * This class represents a demo of the application.
 *
 */

export class Demo {
  get id() {
    return this.props.id.toString();
  }

  get name() {
    return this.props.name;
  }

  get frames() {
    return this.props.frames;
  }

  constructor(readonly props: DemoProps) {}
}
