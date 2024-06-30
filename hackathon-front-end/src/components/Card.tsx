interface CardProps {
    title: string;
    count: number;
}

const Card: React.FC<CardProps> = ({ title, count }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-3xl">{count}</p>
        </div>
    );
};

export default Card;
