import React, { useState, useEffect } from "react";
import styles from "./shared.module.sass";
import { Card, Icon, Image } from "semantic-ui-react";
import { navigate } from "@reach/router";
import "./AnimalCard.sass";

export const AnimalCard = ({ cardData }) => {
	const id = 0;
	return (
		<Card
			className={styles.animalCard}
			onClick={() => {
				navigate(`/pet-profile/${cardData._id}`);
			}}
		>
			<Image src={cardData.animalImageLink} wrapped ui={false} />
			<Card.Content>
				<Card.Header onClick={() => navigate(`/pet-profile/${id}`)}>
					{cardData.animalName || "None"}
				</Card.Header>
				<Card.Meta>
					<span className="date">{cardData.type === "search" ? cardData.lossDate : cardData.createdAt}</span>
				</Card.Meta>
				<Card.Description>{cardData.animalDescription}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<a>
					<Icon name="paw" />
					{cardData.animalType}
				</a>
			</Card.Content>
		</Card>
	);
};
