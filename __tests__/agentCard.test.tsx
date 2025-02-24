import { render, screen, waitFor } from "@testing-library/react";
import AgentCard from "@/app/agents/components/AgentCard";
import { Agent, AgentStatus } from "@/types/agent";
import "@testing-library/jest-dom";

const mockAgent: Agent = {
  id: 1,
  name: "Daniel Pérez",
  profilePicture: "/assets/DanielPerez.jpeg",
  status: AgentStatus.Active,
  position: "Ingeniero de Software",
  country: "Colombia",
  lastUpdate: Date.now() - 10000,
};

describe("AgentCard Component", () => {
  it("debe renderizar el nombre del agente", async () => {
    render(<AgentCard agent={mockAgent} />);
    await waitFor(() => {
      expect(screen.getByText("Daniel Pérez")).toBeInTheDocument();
    });
  });

  it("debe mostrar la posición del agente", async () => {
    render(<AgentCard agent={mockAgent} />);
    await waitFor(() => {
      expect(screen.getByText("Ingeniero de Software")).toBeInTheDocument();
    });
  });

  it("debe mostrar la imagen de perfil", async () => {
    render(<AgentCard agent={mockAgent} />);
    await waitFor(() => {
      const img = screen.getByAltText("Daniel Pérez");
      expect(img).toHaveAttribute("src", mockAgent.profilePicture);
    });
  });

  it("debe mostrar el tiempo en espera", async () => {
    render(<AgentCard agent={mockAgent} />);
    await waitFor(() => {
      expect(screen.getByText(/Tiempo en espera:/i)).toBeInTheDocument();
    });
  });

  it("debe mostrar el status del agente", async () => {
    render(<AgentCard agent={mockAgent} />);
    await waitFor(() => {
      const statusElement = screen.getByRole('img', { hidden: true }).parentElement?.querySelector('span');
      expect(statusElement).toHaveClass('bg-green-500');
    });
  });
});