import { useState } from 'react';
import { Accordion, Form } from 'react-bootstrap';
import SidebarToggleButton from '../components/SidebarToggleButton.jsx';

function Help({ onMenuOpen }) {
    const faqs = [
        {
            question: "How do I create a new challenge?",
            answer: "Go to the 'Challenges' section, type your idea or choose a quick prompt, and click 'Generate'. Then simply 'Join' the challenge to start tracking your progress!"
        },
        {
            question: "How do rewards work?",
            answer: "Rewards are motivational bonuses you can claim using your earned points. Complete challenges and milestones to gather points, then spend them on rewards you generate or create."
        },
        {
            question: "What are points and how do I earn them?",
            answer: "You earn points by completing daily milestones from your challenges. Some bonuses like streaks and combos give extra points!"
        },
        {
            question: "Can I create my own reward ideas?",
            answer: "Yes! In the 'Rewards' section, either generate ideas with AI or create your own. Then claim them when you have enough points!"
        },
        {
            question: "How does leveling work?",
            answer: "Each completed action grants you experience (XP). As you level up, your available points and progress stats increase too. See your level stats under 'Stats'."
        },
        {
            question: "How can I delete all my challenges or rewards?",
            answer: "Go to the 'Account' page. There you can delete all challenges, all rewards, or even delete your entire account if needed."
        },
        {
            question: "I generated a wrong challenge. Can I delete it?",
            answer: "Yes. Simply click on a challenge, and you'll find an option to delete it individually if it's no longer needed."
        },
        {
            question: "What does the 'Available Points' counter mean?",
            answer: "It shows the total number of points you have earned by completing milestones. You can spend them to claim rewards."
        },
        {
            question: "Is there a way to edit a challenge after creating it?",
            answer: "Currently, challenges cannot be edited after generation. You can delete and create a new one if needed."
        },
        {
            question: "How can I update my profile information?",
            answer: "Go to the 'Account' page, click 'Edit' next to the field you want to change, and save your updates."
        },
    ];

    const [searchTerm, setSearchTerm] = useState('');

    const filteredFaqs = faqs.filter(({ question, answer }) => {
        const lowerSearch = searchTerm.toLowerCase();
        return question.toLowerCase().includes(lowerSearch) || answer.toLowerCase().includes(lowerSearch);
    });

    return (
        <div className="container m-0 p-0 d-flex flex-column gap-4" style={{ zIndex: 1 }}>
            <div className="d-flex align-items-center justify-content-between gap-2">
                <div className="d-flex align-items-center gap-1">
                    <SidebarToggleButton onClick={onMenuOpen} />
                    <h4 className="fw-bold m-0">Help</h4>
                </div>
                <Form.Control
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ maxWidth: 250 }}
                    className="rounded-5"
                />
            </div>

            <div className="p-3 bg-white shadow-sm rounded-4">
                <Accordion defaultActiveKey="0">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq, index) => (
                            <Accordion.Item eventKey={index.toString()} key={index}>
                                <Accordion.Header>{faq.question}</Accordion.Header>
                                <Accordion.Body>{faq.answer}</Accordion.Body>
                            </Accordion.Item>
                        ))
                    ) : (
                        <div className="text-center text-muted p-4">
                            No results found.
                        </div>
                    )}
                </Accordion>
            </div>
        </div>
    );
}

export default Help;